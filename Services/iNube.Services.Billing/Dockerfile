FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY  ["iNube.Services.Billing.csproj", "iNube.Services.Billing/"]
RUN dotnet restore "iNube.Services.Billing/iNube.Services.Billing.csproj"
COPY . "iNube.Services.Billing/"
WORKDIR "/src/iNube.Services.Billing"
RUN dotnet build "iNube.Services.Billing.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "iNube.Services.Billing.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "iNube.Services.Billing.dll"]