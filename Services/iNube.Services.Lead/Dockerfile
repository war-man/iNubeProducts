FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["iNube.Services.Lead.csproj", "iNube.Services.Lead/"]
RUN dotnet restore "iNube.Services.Lead/iNube.Services.Lead.csproj"
COPY . "iNube.Services.Lead/"
WORKDIR "/src/iNube.Services.Lead"
RUN dotnet build "iNube.Services.Lead.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "iNube.Services.Lead.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "iNube.Services.Lead.dll"]