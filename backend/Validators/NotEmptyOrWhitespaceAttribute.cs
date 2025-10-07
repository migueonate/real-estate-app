using System;
using System.ComponentModel.DataAnnotations;

namespace RealEstateApi.Validators
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class NotEmptyOrWhitespaceAttribute : ValidationAttribute
    {
        public NotEmptyOrWhitespaceAttribute()
        {
            ErrorMessage = "Field cannot be empty or whitespace.";
        }

        public override bool IsValid(object? value)
        {
            if (value is string str)
            {
                return !string.IsNullOrWhiteSpace(str);
            }

            return false;
        }
    }
}
