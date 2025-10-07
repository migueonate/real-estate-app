using System.ComponentModel.DataAnnotations;
using RealEstateApi.Validators;

namespace RealEstateApi.DTOs
{
    public class PropertyDto
    {
        public string? Id { get; set; }

        [Required(ErrorMessage = "IdOwner is required.")]
        [NotEmptyOrWhitespace(ErrorMessage = "IdOwner cannot be empty or whitespace.")]
        public string IdOwner { get; set; } = null!;

        [Required(ErrorMessage = "Property name is required.")]
        [NotEmptyOrWhitespace(ErrorMessage = "Property name cannot be empty or whitespace.")]
        [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters.")]
        public string Name { get; set; } = null!;

        [Required(ErrorMessage = "Address is required.")]
        [NotEmptyOrWhitespace(ErrorMessage = "Address cannot be empty or whitespace.")]
        [StringLength(200, ErrorMessage = "Address cannot exceed 200 characters.")]
        public string Address { get; set; } = null!;

        [Range(1, double.MaxValue, ErrorMessage = "Price must be greater than 0.")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "At least one image URL is required.")]
        [Url(ErrorMessage = "Image must be a valid URL.")]
        public string Image { get; set; } = null!;
    }
}
