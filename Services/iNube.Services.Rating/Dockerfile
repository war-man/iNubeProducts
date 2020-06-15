FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build 
WORKDIR /src
COPY ["iNube.Services.Rating.csproj", "iNube.Services.Rating/"]
RUN dotnet restore "iNube.Services.Rating/iNube.Services.Rating.csproj"
COPY . "iNube.Services.Rating/"
WORKDIR "/src/iNube.Services.Rating"
RUN dotnet build "iNube.Services.Rating.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "iNube.Services.Rating.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "iNube.Services.Rating.dll"]