ALTER proc [dbo].[Blogs_Select_BlogCategory]
					
					@Id int
					,@PageIndex int 
					,@PageSize int 
					

AS

/* TEST CODE 

DECLARE @Id int = 5
		,@PageIndex int = 0  
		,@PageSize int = 10
		
EXECUTE dbo.Blogs_Select_BlogCategory   
					@Id 
					,@PageIndex
					,@PageSize 				

*/

BEGIN 

DECLARE @offset int = @PageIndex * @PageSize

SELECT		[b].[Id] BlogId
		   ,[bt].[Id]
		   ,[bt].[Name] AS Category
		   ,Author = dbo.fn_GetUserJSON(b.AuthorId)
           ,[b].[Title]
           ,[b].[Subject]
           ,[b].[Content]
           ,[b].[IsPublished]
           ,[b].[ImageUrl] AS BlogImage
		   ,[b].[DateCreated]
		   ,[b].[DateModified]
           ,[b].[DatePublish]
           ,[b].[IsDeleted]
		   ,TotalCount = COUNT(1) OVER()
     
	 FROM [dbo].[Blogs] AS b
	 INNER JOIN [dbo].[Users] AS u 
					ON b.AuthorId = u.Id
	 INNER JOIN [dbo].[BlogTypes] AS bt 
					ON b.BlogCategoryId = bt.Id 
	 
	 WHERE bt.Id = @Id

	 ORDER BY b.Id 

	 OFFSET @offset Rows
	 Fetch Next @PageSize Rows ONLY 
	 
END
