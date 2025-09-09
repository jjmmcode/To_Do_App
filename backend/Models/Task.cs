using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Task
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El título es obligatorio.")]
        [MaxLength(50, ErrorMessage = "El título no puede superar los 50 caracteres.")]
        public string Title { get; set; } = string.Empty;

        [MaxLength(200, ErrorMessage = "La descripción no puede superar los 200 caracteres.")]
        public string? Description { get; set; }

        public bool IsCompleted { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // 🔹 Relación con el usuario
        [Required]
        public int UserId { get; set; }

        [JsonIgnore] 
        public User? User { get; set; } 
    }
}
