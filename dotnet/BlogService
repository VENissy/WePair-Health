using WePair.Data.Providers;
using WePair.Services.Interfaces;
using WePair.Models.Requests.Blogs;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using WePair.Data;
using WePair.Models;
using WePair.Models.Domain.Blogs;
using WePair.Models.Domain.Users;

namespace WePair.Services
{
    public class BlogService : IBlogService
    {
        IDataProvider _data = null;
        ILookUpService _lookUpService = null;

        public BlogService(IDataProvider data, ILookUpService lookUpService)
        {
            _data = data;
            _lookUpService = lookUpService;
        }

        public void Update(BlogUpdateRequest model, int currentUser)
        {
            _data.ExecuteNonQuery("[dbo].[Blogs_Update]", inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@IsPublished", model.IsPublished);
                col.AddWithValue("@IsDeleted", model.IsDeleted);                
                AddCommonParams(model, col, currentUser);   
            },
            returnParameters: null);
        }

        public int Add(BlogAddRequest model, int currentUser)
        {
            int id = 0;

            _data.ExecuteNonQuery("[dbo].[Blogs_Insert]", inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, currentUser);
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);
            },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object anId = returnCollection["@Id"].Value;
                int.TryParse(anId.ToString(), out id);
            });
            return id;
        }

        public void DeleteBlog(int id, bool isDeleted)
        {         
            _data.ExecuteNonQuery("[dbo].[Blogs_Delete]", delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
                paramCollection.AddWithValue("@isDeleted",isDeleted);
            },
            returnParameters: null);
        }

        public Paged<Blog> SelectAllPaginated(int pageIndex, int pageSize)
        {
            Paged<Blog> pagedList = null;
            List<Blog> list = null;
            int totalCount = 0;

            _data.ExecuteCmd("[dbo].[Blogs_SelectAll_Paginated]",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@PageIndex", pageIndex);
                parameterCollection.AddWithValue("@PageSize", pageSize);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                Blog aBlog = MapSingleBlog(reader);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(reader.FieldCount - 1);
                }
                if (list == null)
                {
                    list = new List<Blog>();
                }
                list.Add(aBlog);
            });
            if (list != null)
            {
                pagedList = new Paged<Blog>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Blog> GetByCreatedByPaginated(int id, int pageIndex, int pageSize)
        {
            Paged<Blog> pagedList = null;
            List<Blog> list = null;
            int totalCount = 0;

            _data.ExecuteCmd("[dbo].[Blogs_Select_ByCreatedBy]",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@Id", id);
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    Blog aBlog = MapSingleBlog(reader);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(reader.FieldCount - 1);
                    }
                    if (list == null)
                    {
                        list = new List<Blog>();
                    }
                    list.Add(aBlog);
                });

            if (list != null)
            {
                pagedList = new Paged<Blog>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Blog GetById(int id)
        { 
            Blog aBlog = null;

            _data.ExecuteCmd("[dbo].[Blogs_Select_ById]", delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            },
            delegate (IDataReader reader, short set)
            {
                aBlog = MapSingleBlog(reader);
            });
            return aBlog;
        }

        public Paged<Blog> GetByCategory(int id, int pageIndex, int pageSize)
        {
            Paged<Blog> pagedList = null;
            List<Blog> list = null;
            int totalCount = 0;

            _data.ExecuteCmd("[dbo].[Blogs_Select_BlogCategory]",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@Id", id);
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    Blog aBlog = MapSingleBlog(reader);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(reader.FieldCount - 1);
                    }
                    if (list == null)
                    {
                        list = new List<Blog>();
                    }
                    list.Add(aBlog);
                });

            if (list != null)
            {
                pagedList = new Paged<Blog>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        private Blog MapSingleBlog(IDataReader reader)
        {
            Blog aBlog = new Blog();
            int startingIndex = 0;

            aBlog.Id = reader.GetSafeInt32(startingIndex++);
            aBlog.Category = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            aBlog.Author = reader.DeserializeObject<BaseUser>(startingIndex++);
            aBlog.Title = reader.GetSafeString(startingIndex++);
            aBlog.Subject = reader.GetSafeString(startingIndex++);
            aBlog.Content = reader.GetSafeString(startingIndex++);
            aBlog.IsPublished = reader.GetBoolean(startingIndex++);
            aBlog.ImageUrl = reader.GetSafeString(startingIndex++);
            aBlog.DateCreated = reader.GetDateTime(startingIndex++);
            aBlog.DateModified = reader.GetDateTime(startingIndex++);
            aBlog.DatePublish = reader.GetDateTime(startingIndex++);
            aBlog.IsDeleted = reader.GetBoolean(startingIndex++);

            return aBlog;
        }

        private static void AddCommonParams(BlogAddRequest model, SqlParameterCollection col, int currentUser)
        {
            col.AddWithValue("@BlogCategoryId", model.BlogCategoryId);
            col.AddWithValue("@AuthorId", currentUser);
            col.AddWithValue("@Title", model.Title);
            col.AddWithValue("@Subject", model.Subject);
            col.AddWithValue("@Content", model.Content);
            col.AddWithValue("@ImageUrl", model.ImageUrl);
            col.AddWithValue("@DatePublish", model.DatePublish);
        }
    }
}
