FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app


FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["iNube.Services.Accounting.csproj", "iNube.Services.Accounting/"]
RUN dotnet restore "iNube.Services.Accounting/iNube.Services.Accounting.csproj"
COPY . "iNube.Services.Accounting/"
WORKDIR "/src/iNube.Services.Accounting"
RUN dotnet build "iNube.Services.Accounting.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "iNube.Services.Accounting.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "iNube.Services.Accounting.dll"]