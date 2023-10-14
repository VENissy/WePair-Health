using System;
using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests.Blogs
{
    public  class BlogAddRequest
    {
       
        [Required]
        [Range(1, int.MaxValue)]
        public int BlogCategoryId { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Title { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string Subject { get; set; }

        
        [StringLength(4000, MinimumLength = 2)]
        public string Content { get; set; }

        [Required]
        public bool IsPublished { get; set; }

        [Url]
        [StringLength(255, MinimumLength = 2)]
        public string ImageUrl { get; set; }

       
        public DateTime DatePublish { get; set; }

        [Required]
        public bool IsDeleted { get; set; } 


    }
}
