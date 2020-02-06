FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["iNube.Services.UserManagement.csproj", "iNube.Services.UserManagement/"]
RUN dotnet restore "iNube.Services.UserManagement/iNube.Services.UserManagement.csproj"
COPY . "iNube.Services.UserManagement/"
WORKDIR "/src/iNube.Services.UserManagement"
RUN dotnet build "iNube.Services.UserManagement.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "iNube.Services.UserManagement.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "iNube.Services.UserManagement.dll"]