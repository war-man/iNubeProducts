FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build 
WORKDIR /src
COPY ["iNube.Services.ReInsurance.csproj", "iNube.Services.ReInsurance/"]
RUN dotnet restore "iNube.Services.ReInsurance/iNube.Services.ReInsurance.csproj"
COPY . "iNube.Services.ReInsurance/"
WORKDIR "/src/iNube.Services.ReInsurance"
RUN dotnet build "iNube.Services.ReInsurance.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "iNube.Services.ReInsurance.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "iNube.Services.ReInsurance.dll"] 