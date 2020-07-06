FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["iNube.Services.ProductConfiguration.csproj", "iNube.Services.ProductConfiguration/"]
RUN apt-get update && apt-get install -y nuget
RUN nuget help | select -First 1
RUN apt-get update && apt-get install -y curl 
RUN curl -Iv google.com ; 
RUN curl -Iv https://api.nuget.org/v3-flatcontainer/inube.utility.framework/index.json
RUN dotnet restore "iNube.Services.ProductConfiguration/iNube.Services.ProductConfiguration.csproj"
COPY . "iNube.Services.ProductConfiguration/"
WORKDIR "/src/iNube.Services.ProductConfiguration"
RUN apt-get update && apt-get install -y nuget
RUN dotnet build "iNube.Services.ProductConfiguration.csproj" -c Release -o /app 

FROM build AS publish
RUN dotnet publish "iNube.Services.ProductConfiguration.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "iNube.Services.ProductConfiguration.dll"]