
using System;
using System.Collections.Generic;

public class ProdutViewModel
{
    public ProdutViewModel()
    {
        lstProduct = new List<ProductBasic>();
    }
    public ProductBasic pd { get; set; }
    public List<ProductBasic> lstProduct { get; set; }



    public static implicit operator string(ProdutViewModel v)
    {
        throw new NotImplementedException();
    }
}