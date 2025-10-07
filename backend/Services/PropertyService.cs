using MongoDB.Driver;
using MongoDB.Bson;
using RealEstateApi.Models;
using Microsoft.Extensions.Options;

namespace RealEstateApi.Services
{
    public class RealEstateDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string CollectionName { get; set; } = null!;
    }

    public class PropertyService
    {
        private readonly IMongoCollection<Property> _propertiesCollection;

        public PropertyService(IOptions<RealEstateDatabaseSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _propertiesCollection = mongoDatabase.GetCollection<Property>(settings.Value.CollectionName);
        }

        public async Task<List<Property>> GetAsync() =>
            await _propertiesCollection.Find(_ => true).ToListAsync();

        public async Task<Property?> GetAsync(string id) =>
            await _propertiesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Property newProperty) =>
            await _propertiesCollection.InsertOneAsync(newProperty);


        public async Task<List<Property>> GetFilteredAsync(string? name, string? address, decimal? minPrice, decimal? maxPrice)
        {
            var filter = Builders<Property>.Filter.Empty;

            if (!string.IsNullOrEmpty(name))
                filter &= Builders<Property>.Filter.Regex("name", new BsonRegularExpression(name, "i"));

            if (!string.IsNullOrEmpty(address))
                filter &= Builders<Property>.Filter.Regex("address", new BsonRegularExpression(address, "i"));

            if (minPrice.HasValue && maxPrice.HasValue)
                filter &= Builders<Property>.Filter.Gte(p => p.Price, minPrice.Value) &
                          Builders<Property>.Filter.Lte(p => p.Price, maxPrice.Value);
            else if (minPrice.HasValue)
                filter &= Builders<Property>.Filter.Gte(p => p.Price, minPrice.Value);
            else if (maxPrice.HasValue)
                filter &= Builders<Property>.Filter.Lte(p => p.Price, maxPrice.Value);

            return await _propertiesCollection.Find(filter).ToListAsync();
        }
    }
}
