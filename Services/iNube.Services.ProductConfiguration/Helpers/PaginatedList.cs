using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.ProductConfiguration.Helpers
{
    public class PaginatedList<TQ,TR>
    {
        public int CurrentPage { get; private set; }
        public int From { get; private set; }
        public List<TR> Items { get; private set; }
        public int PageSize { get; private set; }
        public int To { get; private set; }
        public int TotalCount { get; private set; }
        public int TotalPages { get; private set; }

        public PaginatedList(List<TQ> items, int count, int currentPage, int pageSize)
        {
            CurrentPage = currentPage;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            TotalCount = count;
            PageSize = pageSize;
            From = ((currentPage - 1) * pageSize) + 1;
            To = (From + pageSize) - 1;
            //var mapper = new AutoMapperProfile();
            try
            {
                var config = new AutoMapper.MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<TR, TQ>().ReverseMap();
                });

                IMapper mapper = config.CreateMapper();
                var res = mapper.Map<IEnumerable<TR>>(items).ToList();
                Items = res;
                //var mapper = new Mapper(Mapper.Configuration,);
                //var resItems = mapper.DefaultContext.Mapper.Map<IEnumerable<TR>>(items).ToList();
                //Items = items;
            }
            catch (Exception ex)
            {

                
            }
           
        }

        public bool HasPreviousPage
        {
            get
            {
                return (CurrentPage > 1);
            }
        }

        public bool HasNextPage
        {
            get
            {
                return (CurrentPage < TotalPages);
            }
        }

        public static async Task<PaginatedList<TQ,TR>> CreateAsync(
            IQueryable<TQ> source, int currentPage, int pageSize, string sortOn, string sortDirection) 
        {
            var count = await source.CountAsync();

            if (!string.IsNullOrEmpty(sortOn))
            {
                if (sortDirection.ToUpper() == "ASC")
                    source = source.OrderBy(sortOn);
                else
                    source = source.OrderByDescending(sortOn);
            }

            source = source.Skip(
                (currentPage - 1) * pageSize)
                .Take(pageSize);


            var items = await source.ToListAsync();

            return new PaginatedList<TQ,TR>(items, count, currentPage, pageSize);
        }
    }
}
