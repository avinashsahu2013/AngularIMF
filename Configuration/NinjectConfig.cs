//using System;
//using System.Web;
//using Ninject;
//using Ninject.Web.Common;
//using LTI.IMF.Service;
//using LTI.IMF.Repositories;
//using System.Web.Http;
//using Ninject.Web.WebApi;
//using Microsoft.Web.Infrastructure.DynamicModuleHelper;
//using LTI.IMF.ApiService.MasterData;
//using Ipm.Interfaces.Api.MasterData;
//using LTI.IMF.Interfaces.Business.MasterData;
//using LTI.IMF.Business.MasterData;
//using LTI.IMF.Interfaces.Data;
//using LT.IMF.Data.UnitOfWork;

//namespace LTI.IMF.Web.Configuration
//{
//    public static class NinjectConfig
//    {
//        private static readonly Bootstrapper Bootstrapper = new Bootstrapper();

//        public static void Start()
//        {
//            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
//            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
//            Bootstrapper.Initialize(CreateKernel);
//        }

//        public static IKernel GetKernel()
//        {
//            return CreateKernel();
//        }

//        public static void Stop()
//        {
//            Bootstrapper.ShutDown();
//        }

//        private static IKernel CreateKernel()
//        {
//            var kernel = new StandardKernel();
//            try
//            {
//                kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
//                kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();
//                RegisterServices(kernel);
//                return kernel;
//            }
//            catch
//            {
//                kernel.Dispose();
//                throw;
//            }
//        }

//        /// <summary>
//        /// Load your modules or register your services here!
//        /// </summary>
//        /// <param name="kernel">The kernel.</param>
//        private static void RegisterServices(IKernel kernel)
//        {
//            kernel.Bind<LTI.IMF.Pattern.IUnitOfWork>().To<LTI.IMF.Pattern.UnitOfWork>().InRequestScope();
//            kernel.Bind<LTI.IMF.Pattern.IDataContextAsync>().To<LTI.IMF.Data.IMFContext>().InRequestScope();

//            kernel.Bind<ISecurityRepository>().To<SecurityRepository>().InRequestScope();
//            kernel.Bind<ISecurityService>().To<SecurityService>().InRequestScope();

//            kernel.Bind<IDataTapeRepository>().To<DataTapeRepository>().InRequestScope();
//            kernel.Bind<IDataTapeService>().To<DataTapeService>().InRequestScope();

//            kernel.Bind<ILogRepository>().To<LogRepository>().InRequestScope();
//            kernel.Bind<ILogService>().To<LogService>().InRequestScope();

//            kernel.Bind<IImportProcessRepository>().To<ImportProcessRepository>().InRequestScope();
//            kernel.Bind<IImportProcessService>().To<ImportProcessService>().InRequestScope();


//            kernel.Bind<IMailService>().To<MailService>().InRequestScope();
//            kernel.Bind<LTI.IMF.Pattern.IUserFactory>().To<LTI.IMF.WebApi.UserFactory>().InRequestScope();            


//            GlobalConfiguration.Configuration.DependencyResolver = new NinjectDependencyResolver(kernel);

//        }
//    }
//}