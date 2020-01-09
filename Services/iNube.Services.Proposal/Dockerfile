FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["iNube.Services.Proposal.csproj", "iNube.Services.Proposal/"]
RUN dotnet restore "iNube.Services.Proposal/iNube.Services.Proposal.csproj"
COPY . "iNube.Services.Proposal/"
WORKDIR "/src/iNube.Services.Proposal"
RUN dotnet build "iNube.Services.Proposal.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "iNube.Services.Proposal.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "iNube.Services.Proposal.dll"]