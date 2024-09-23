namespace IKEA.Models
{ 
public class UserModel
{
    public int UserId { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }
    public string email { get; set; }
        public string address { get; set; }
    }

public class AdminModel
{
    public string UserName { get; set; }
    public string Password { get; set; }
}
}
