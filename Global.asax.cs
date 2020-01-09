using System;
using LTI.IMF.WebApi;
using System.Web;
using log4net.Config;
using System.Security.Cryptography;
using System.Web.Security;
using System.Web.Configuration;
using System.Web.Http;

//[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(LTI.IMF.Web.Configuration.NinjectConfig), "Start")]
//[assembly: WebActivatorEx.ApplicationShutdownMethod(typeof(LTI.IMF.Web.Configuration.NinjectConfig), "Stop")]


namespace LTI.IMF.Web
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            //UnityConfig.RegisterComponents();
            
            GlobalConfiguration.Configure(WebApiConfig.Register);          
            XmlConfigurator.Configure();
        }
        protected void Application_BeginRequest(Object sender, EventArgs e)
        {
            if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
            {
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
                HttpContext.Current.Response.End();
            }
        }
        protected void Application_Error(object sender, EventArgs e)
        {
            var error = Server.GetLastError();
            var cryptoEx = error as CryptographicException;
            if (cryptoEx != null)
            {
                // clear authentication cookie
                HttpCookie cookie1 = new HttpCookie(FormsAuthentication.FormsCookieName, "");
                cookie1.Expires = DateTime.Now.AddDays(-1);
                Response.Cookies.Add(cookie1);

                // clear session cookie (not necessary for your current problem but i would recommend you do it anyway)
                SessionStateSection sessionStateSection = (SessionStateSection)WebConfigurationManager.GetSection("system.web/sessionState");
                HttpCookie cookie2 = new HttpCookie(sessionStateSection.CookieName, "");
                cookie2.Expires = DateTime.Now.AddDays(-1);
                Response.Cookies.Add(cookie2);

                FormsAuthentication.SignOut();
                Server.ClearError();
                Session.Abandon();
                FormsAuthentication.RedirectToLoginPage();
            }
        }
    }
}