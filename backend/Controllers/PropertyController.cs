using Microsoft.AspNetCore.Mvc;
using RealEstateApi.Models;
using RealEstateApi.Services;
using RealEstateApi.DTOs;
using RealEstateApi.Mappers;

namespace RealEstateApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertyController : ControllerBase
    {
        private readonly PropertyService _propertyService;

        public PropertyController(PropertyService propertyService) =>
            _propertyService = propertyService;

        [HttpGet]
        public async Task<List<PropertyDto>> Get(
            [FromQuery] string? name,
            [FromQuery] string? address,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice)
        {
            var properties = await _propertyService.GetFilteredAsync(name, address, minPrice, maxPrice);
            return properties.Select(p => p.ToDto()).ToList();
        }

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<PropertyDto>> Get(string id)
        {
            var property = await _propertyService.GetAsync(id);

            if (property is null)
                return NotFound();

            return property.ToDto();
        }

        [HttpPost]
        public async Task<IActionResult> Post(PropertyDto newPropertyDto)
        {
            var property = newPropertyDto.ToModel();
            await _propertyService.CreateAsync(property);
            return CreatedAtAction(nameof(Get), new { id = property.Id }, property.ToDto());
        }
    }
}
