using RealEstateApi.Models;
using RealEstateApi.DTOs;

namespace RealEstateApi.Mappers
{
    public static class PropertyMapper
    {
        public static PropertyDto ToDto(this Property model)
        {
            return new PropertyDto
            {
                Id = model.Id,
                IdOwner = model.IdOwner,
                Name = model.Name,
                Address = model.Address,
                Price = model.Price,
                Image = model.Image
            };
        }

        public static Property ToModel(this PropertyDto dto)
        {
            return new Property
            {
                Id = dto.Id,
                IdOwner = dto.IdOwner,
                Name = dto.Name,
                Address = dto.Address,
                Price = dto.Price,
                Image = dto.Image
            };
        }
    }
}
