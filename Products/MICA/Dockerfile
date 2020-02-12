FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src

RUN curl -sL https://deb.nodesource.com/setup_10.x |  bash -
RUN apt-get install -y nodejs

COPY ["MICA.csproj", "MICA/"]
RUN dotnet restore "MICA/MICA.csproj"
COPY . "MICA/"
WORKDIR "/src/MICA"
RUN dotnet build "MICA.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "MICA.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "MICA.dll"]