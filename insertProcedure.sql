ALTER proc [dbo].[Blogs_Insert]

					@BlogCategoryId INT
					,@AuthorId INT
					,@Title NVARCHAR(100)
					,@Subject NVARCHAR(50)
					,@Content NVARCHAR(4000)
					,@ImageUrl NVARCHAR(255)
					,@DatePublish DATETIME = Null			
					,@Id int OUTPUT

AS

/* TEST CODE 

DECLARE @_Id int = 0 

DECLARE				@_BlogCategoryId INT = 3
					,@_AuthorId INT = 2
					,@_Title NVARCHAR(100) = 'Health'
					,@_Subject NVARCHAR(50) = 'Healthy'
					,@_Content NVARCHAR(4000) = 'Healthy living '
					,@_ImageUrl NVARCHAR(255) = 'bit.ly/44qa5dF'
					,@_DatePublish DATETIME = '2023-08-25'
					
EXECUTE dbo.Blogs_Insert
					@_BlogCategoryId
				   ,@_AuthorId
				   ,@_Title 
				   ,@_Subject 
				   ,@_Content 
				   ,@_ImageUrl 
				   ,@_DatePublish 
				   ,@_Id OUTPUT

*/

BEGIN 

		INSERT INTO 
				[dbo].[Blogs] (
				   [BlogCategoryId]
				   ,[AuthorId]
				   ,[Title]
				   ,[Subject]
				   ,[Content]
				   ,[ImageUrl]
				   ,[DatePublish]
			  ) VALUES (
				   @BlogCategoryId
				   ,@AuthorId
				   ,@Title 
				   ,@Subject 
				   ,@Content 
				   ,@ImageUrl 
				   ,@DatePublish 		
			);

		SET @Id = SCOPE_IDENTITY() 

END
