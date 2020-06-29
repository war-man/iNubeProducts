FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["iNube.Services.Dispatcher.csproj", "iNube.Services.Dispatcher/"]
RUN dotnet restore "iNube.Services.Dispatcher/iNube.Services.Dispatcher.csproj"
COPY . "iNube.Services.Dispatcher/"
WORKDIR "/src/iNube.Services.Dispatcher"
RUN dotnet build "iNube.Services.Dispatcher.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "iNube.Services.Dispatcher.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "iNube.Services.Dispatcher.dll"]