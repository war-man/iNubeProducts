FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["iNube.Services.Partners.csproj", "iNube.Services.Partners/"]
RUN dotnet restore "iNube.Services.Partners/iNube.Services.Partners.csproj"
COPY . "iNube.Services.Partners/"
WORKDIR "/src/iNube.Services.Partners"
RUN dotnet build "iNube.Services.Partners.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "iNube.Services.Partners.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "iNube.Services.Partners.dll"]