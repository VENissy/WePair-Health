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
