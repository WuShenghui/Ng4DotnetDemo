using System;

namespace Ng4DotnetServer.Models
{
    public class Crud
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public int Type { get; set; }
        public string Email { get; set; }
        public Double Count { get; set; }
        public bool Activated { get; set; }
        public string Languages { get; set; }
    }
}