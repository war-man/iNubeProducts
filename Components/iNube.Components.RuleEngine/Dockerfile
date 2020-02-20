FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app


FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["iNube.Components.RuleEngine.csproj", "iNube.Components.RuleEngine/"]
RUN dotnet restore "iNube.Components.RuleEngine/iNube.Components.RuleEngine.csproj"
COPY . "iNube.Components.RuleEngine/"
WORKDIR "/src/iNube.Components.RuleEngine"
RUN dotnet build "iNube.Components.RuleEngine.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "iNube.Components.RuleEngine.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "iNube.Components.RuleEngine.dll"]