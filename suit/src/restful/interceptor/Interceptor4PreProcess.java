package restful.interceptor;  

import java.lang.annotation.Annotation;  

import java.lang.reflect.Method;  

import java.lang.reflect.Modifier;  

import java.lang.reflect.Parameter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;  

import javax.ws.rs.core.Context;  

import javax.ws.rs.core.Response;  

import org.jboss.resteasy.core.Headers;  

import org.jboss.resteasy.core.ResourceMethodInvoker;  

import org.jboss.resteasy.core.ServerResponse;  

import org.jboss.resteasy.spi.HttpRequest;  

import org.jboss.resteasy.spi.interception.PreProcessInterceptor;

import net.sf.json.JSONObject;
import restful.annotation.Permission;
import restful.database.EM;
import restful.entity.User;  

public class Interceptor4PreProcess implements PreProcessInterceptor {
	private @Context HttpServletRequest request;  

	@Override
    public ServerResponse preProcess(HttpRequest httpRequest, ResourceMethodInvoker resourceMethodInvoker) {  
        Method method = resourceMethodInvoker.getMethod();  
        Annotation[] annotations  = method.getDeclaredAnnotations();          
        JSONObject jsonObject = new JSONObject();
        
        // 核验用户是否登录
        if(method.isAnnotationPresent(Permission.class)) { 
            Annotation annotation = method.getAnnotation(Permission.class); 
            String permissionValue = ((Permission)annotation).value(); 
            System.out.printf("%s\t permission value = %s\n", 
                    annotation.toString(),permissionValue); 
            if(permissionValue.equals("login")) {
            	if (request.getSession().getAttribute("curname") == null) {
            		jsonObject.put("code", 0);
            		jsonObject.put("description", "尚未登录");
            		return new ServerResponse(jsonObject, 200, new Headers<Object>());
            	}
            }
        }
        
        // 核验用户是否为管理员
        if(method.isAnnotationPresent(Permission.class)) { 
            Annotation annotation = method.getAnnotation(Permission.class); 
            String permissionValue = ((Permission)annotation).value(); 
            System.out.printf("%s\t permission value = %s\n", 
                    annotation.toString(),permissionValue); 
            if(permissionValue.equals("admin")) {
            	if (request.getSession().getAttribute("curname") == null) {
            		jsonObject.put("code", 0);
            		jsonObject.put("description", "尚未登录");
            		return new ServerResponse(jsonObject, 200, new Headers<Object>());
            	}
                String name = (String) request.getSession().getAttribute("curname");
                List<User> userList = EM.getEntityManager()
      				  .createNamedQuery("User.queryUserByName", User.class)
      				  .setParameter("name", name)
      				  .getResultList();
                if (!userList.isEmpty()) {
                    User user = userList.get(0);
                    if (!user.getIsAdmin()) {
                    	jsonObject.put("code", 0);
                		jsonObject.put("description", "权限不足");
                    	return new ServerResponse(jsonObject, 200, new Headers<Object>());
                    }
                } else {
                	jsonObject.put("code", 0);
            		jsonObject.put("description", "用户不存在");
            		return new ServerResponse(jsonObject, 200, new Headers<Object>());
                }
            }
        }

        System.out.printf("preProcess:\t %s\t %s\t %s\t (",  
                Modifier.toString(method.getModifiers()),method.getReturnType(), method.getName());  
        Parameter[] parameters = method.getParameters();  
        for(Parameter parameter : parameters) {  
            System.out.printf("\t[%s\t %s]\t", parameter.getType(), parameter.getName());  
        }
        System.out.println(")\n");

        return null;
    }
}
