
{

    [Route("api/blogs")]
    [ApiController]
    public class BlogApiController : BaseApiController
    {
        private IBlogService _service = null;
        private IAuthenticationService<int> _authenticationService = null;
        public BlogApiController(IBlogService service
            , ILogger<BlogApiController> logger
            , IAuthenticationService<int> authenticationService) : base(logger)
        {
            _service = service;
            _authenticationService = authenticationService;
        }

        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> Update(BlogUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authenticationService.GetCurrentUserId();
                _service.Update(model, userId);
                SuccessResponse itemResponse = new SuccessResponse();
                response = itemResponse;
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(BlogAddRequest model)
        {
            ObjectResult result = null;
           
            try
            {
                int userId = _authenticationService.GetCurrentUserId();
                int id = _service.Add(model, userId);
                ItemResponse<int> response = new ItemResponse<int> { Item = id };
                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpDelete("updatestatus/{id:int}/{isDeleted:bool}")]
        public ActionResult<SuccessResponse> DeleteBlog(int id, bool isDeleted)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {                
                _service.DeleteBlog(id, isDeleted);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
        [AllowAnonymous]
        [HttpGet("paginate")]  
        public ActionResult<ItemResponse<Paged<Blog>>> SelectAllPaginated(int pageIndex, int pageSize)
        {
            ActionResult result = null;
            try
            {
                Paged<Blog> paged = _service.SelectAllPaginated(pageIndex, pageSize);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    int code = 200;
                    ItemResponse<Paged<Blog>> response = new ItemResponse<Paged<Blog>> { Item = paged};
                    result = StatusCode(code, response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }

        [HttpGet("byauthor")]
        
        public ActionResult<ItemResponse<Paged<Blog>>> GetByCreatedByPaginated(int pageIndex, int pageSize)
        {
            ActionResult result = null;
            try
            {
                int userId = _authenticationService.GetCurrentUserId();
                Paged<Blog> paged = _service.GetByCreatedByPaginated(userId, pageIndex, pageSize);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    int code = 200;
                    ItemResponse<Paged<Blog>> response = new ItemResponse<Paged<Blog>> { Item = paged};
                    result = StatusCode(code, response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Blog>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Blog aBlog = _service.GetById(id);

                if (aBlog == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemResponse<Blog> { Item = aBlog };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }
        [AllowAnonymous]
        [HttpGet("category/{id:int}/paginate")]
        public ActionResult<ItemResponse<Paged<Blog>>> GetByCategory(int id, int pageIndex, int pageSize)
        {
            ActionResult result = null;
            try
            {
               
                Paged<Blog> paged = _service.GetByCategory(id, pageIndex, pageSize);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    int code = 200;
                    ItemResponse<Paged<Blog>> response = new ItemResponse<Paged<Blog>> { Item = paged };
                    result = StatusCode(code, response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }
    }
}
