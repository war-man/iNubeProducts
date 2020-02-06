FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 9002

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["iNube.Services.Claims.csproj", "iNube.Services.Claims/"]
RUN dotnet restore "iNube.Services.Claims/iNube.Services.Claims.csproj"
COPY . "iNube.Services.Claims/"
WORKDIR "/src/iNube.Services.Claims"
RUN dotnet build "iNube.Services.Claims.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "iNube.Services.Claims.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "iNube.Services.Claims.dll"]