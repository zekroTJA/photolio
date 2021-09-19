FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY backend.csproj .
RUN dotnet restore backend.csproj
COPY . .
RUN dotnet build backend.csproj -c Release -o /app/build

FROM build AS publish
RUN dotnet publish backend.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS final
# RUN apt-get update && apt-get install -y libgdiplus
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 80 443
VOLUME /app/storage
ENV STORAGE__LOCATIONS__CONTENT="/app/storage"
ENTRYPOINT ["dotnet", "backend.dll"]