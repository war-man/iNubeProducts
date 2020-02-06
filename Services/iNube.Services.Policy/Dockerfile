FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["iNube.Services.Policy.csproj", "iNube.Services.Policy/"]
RUN dotnet restore "iNube.Services.Policy/iNube.Services.Policy.csproj"
COPY . "iNube.Services.Policy/"
WORKDIR "/src/iNube.Services.Policy"
RUN dotnet build "iNube.Services.Policy.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "iNube.Services.Policy.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "iNube.Services.Policy.dll"]