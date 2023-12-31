
{
    public interface IBlogService
    {
        public int Add(BlogAddRequest model, int currentUser);
        void DeleteBlog(int id, bool isDeleted); 
        Blog GetById(int id);
        public Paged<Blog> GetByCategory(int id, int pageIndex, int pageSize);
        Paged<Blog> SelectAllPaginated(int pageIndex, int pageSize);
        Paged<Blog> GetByCreatedByPaginated(int id, int pageIndex, int pageSize); 
        public void Update(BlogUpdateRequest model, int currentUser);
    }
}
