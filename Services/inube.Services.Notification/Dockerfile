FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["inube.Services.Notification.csproj", "inube.Services.Notification/"]
RUN dotnet restore "inube.Services.Notification/inube.Services.Notification.csproj"

COPY . "inube.Services.Notification/"
WORKDIR "/src/inube.Services.Notification"
RUN dotnet build "inube.Services.Notification.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "inube.Services.Notification.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
RUN apt-get update
RUN apt-get install wget
RUN wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6-1/wkhtmltox_0.12.6-1.stretch_amd64.deb
RUN dpkg -i wkhtmltox_0.12.5-1.stretch_amd64.deb; exit 0
RUN apt -f -y install
RUN cp /usr/local/bin/wkhtmltopdf /app/wwwroot/Rotativa
ENTRYPOINT ["dotnet", "inube.Services.Notification.dll"]