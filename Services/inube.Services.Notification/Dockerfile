FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["iNube.Services.Notification.csproj", "iNube.Services.Notification/"]
RUN dotnet restore "iNube.Services.Notification/iNube.Services.Notification.csproj"

COPY . "iNube.Services.Notification/"
WORKDIR "/src/iNube.Services.Notification"
RUN dotnet build "iNube.Services.Notification.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "iNube.Services.Notification.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
RUN apt-get update
RUN apt-get install wget
RUN wget https://downloads.wkhtmltopdf.org/0.12/0.12.5/wkhtmltox_0.12.5-1.stretch_amd64.deb
RUN dpkg -i wkhtmltox_0.12.5-1.stretch_amd64.deb; exit 0
RUN apt -f -y install
RUN cp /usr/local/bin/wkhtmltopdf /app/wwwroot/Rotativa
ENTRYPOINT ["dotnet", "iNube.Services.Notification.dll"]