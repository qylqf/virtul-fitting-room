package restful.api;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import net.sf.json.JSONObject;
import restful.annotation.Permission;
import restful.bean.Result;
import restful.database.EM;
import restful.entity.Cloth;

@Path("/cloth")
public class ClothAPI {
	private @Context HttpServletRequest request;
	private final int pageSize = 5;
	
	public List<Cloth> getClothList(JSONObject input) {
		boolean sex = false;
		String type = "";
		List<Cloth> clothList;
		boolean[] exist = new boolean[2];
		if (input.has("sex")) {
			sex = input.getBoolean("sex");
			exist[0] = true;
		}
		if (input.has("type")) {
			type = input.getString("type");
			exist[1] = true;
		}
		if (exist[0] && exist[1]) {
			clothList = EM.getEntityManager()
					.createNamedQuery("Cloth.queryClothBySexAndType", Cloth.class)
					.setParameter("sex", sex)
					.setParameter("type", type)
					.getResultList();
		} else if (exist[0]) {
			clothList = EM.getEntityManager()
					.createNamedQuery("Cloth.queryClothBySex", Cloth.class)
					.setParameter("sex", sex)
					.getResultList();
		} else if (exist[1]) {
			clothList = EM.getEntityManager()
					.createNamedQuery("Cloth.queryClothByType", Cloth.class)
					.setParameter("type", type)
					.getResultList();
		} else {
			clothList = EM.getEntityManager()
					.createNamedQuery("Cloth.queryAllCloth", Cloth.class)
					.getResultList();
		}
		return clothList;
	}
	
	@POST
	@Path("/getTotalPages")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	@Permission("admin")
	public Result getTotalPages(JSONObject input) {
		List<Cloth> clothList = getClothList(input);
		int total = clothList.size() / pageSize + (clothList.size() % pageSize == 0 ? 0 : 1);
		return new Result(1, "获取成功", total, "");
	}
	
	@POST
	@Path("/queryAllCloth")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	@Permission("login")
	public Result queryAllCloth() {
		List<Cloth> clothList = getClothList(new JSONObject());
		return new Result(1, "获取成功", clothList, "");
	}
	
	@POST
	@Path("/queryClothByInput")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	@Permission("login")
	public Result queryClothByInput(JSONObject input) {
		List<Cloth> clothList = getClothList(input);
		if (input.has("pageNum")) {
			int pageNum = input.getInt("pageNum");
			int total = clothList.size() / pageSize + (clothList.size() % pageSize == 0 ? 0 : 1);
			if (pageNum > total || pageNum < 1) {
				return new Result(0, "页码无效", input, "");
			} else {
				List<Cloth> result = new ArrayList<Cloth>();
				for (int i = Math.max(0, (pageNum - 1) * pageSize); i < Math.min(pageNum * pageSize, clothList.size()); ++i) {
					result.add(clothList.get(i));
				}
				return new Result(1, "查询成功", result, "");
			}
		} else {
			return new Result(1, "查询成功", clothList, "");
		}
		
	}
	
	@POST
	@Path("/queryClothByPage")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	@Permission("admin")
	public Result queryClothByPage(JSONObject input) {
		List<Cloth> clothList = getClothList(input);
		int pageNum = input.getInt("pageNum");
		int total = clothList.size() / pageSize + (clothList.size() % pageSize == 0 ? 0 : 1);
		if (pageNum > total || pageNum < 1) {
			return new Result(0, "页码无效", input, "");
		} else {
			List<Cloth> result = new ArrayList<Cloth>();
			for (int i = Math.max(0, (pageNum - 1) * pageSize); i < Math.min(pageNum * pageSize, clothList.size()); ++i) {
				result.add(clothList.get(i));
			}
			return new Result(1, "查询成功", result, "");
		}
	}
	
	@POST
	@Path("/addCloth")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	@Permission("admin")
	public Result addCloth(Cloth cloth) {
		List<Cloth> clothList = EM.getEntityManager()
				.createNamedQuery("Cloth.queryClothByNumber", Cloth.class)
				.setParameter("number", cloth.getNumber())
				.getResultList();
		if (clothList.isEmpty()) {
			cloth.setId(0);
			cloth = EM.getEntityManager().merge(cloth);
			EM.getEntityManager().persist(cloth);
			EM.getEntityManager().getTransaction().commit();
			return new Result(1, "添加成功", cloth, "");
		} else {
			return new Result(0, "服饰已存在", cloth, "");
		}
	}
	
	@POST
	@Path("/ins")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	@Permission("admin")
	public Result ins(List<Cloth> clothList) {
		for (Cloth cloth : clothList) {
			addCloth(cloth);
		}
		return new Result(1, "添加成功", clothList, "");
	}
	
	@POST
	@Path("/modifyCloth")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	@Permission("admin")
	public Result modifyCloth(Cloth cloth) {
		List<Cloth> clothList = EM.getEntityManager()
				  .createNamedQuery("Cloth.queryClothByNumber", Cloth.class)
				  .setParameter("number", cloth.getNumber())
				  .getResultList();
		if (clothList.isEmpty()) {
			return new Result(0, "服饰不存在", cloth, "");
		} else {
			Cloth temp = clothList.get(0);
			cloth.setId(temp.getId());
			EM.getEntityManager().persist(EM.getEntityManager().merge(cloth));
			EM.getEntityManager().getTransaction().commit();
			return new Result(1, "修改成功", cloth, "");
		}
	}
	
	@POST
	@Path("/deleteCloth")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	@Permission("admin")
	public Result deleteCloth(Cloth cloth) {
		List<Cloth> clothList = EM.getEntityManager()
				  .createNamedQuery("Cloth.queryClothByNumber", Cloth.class)
				  .setParameter("number", cloth.getNumber())
				  .getResultList();
		if (clothList.isEmpty()) {
			return new Result(0, "服饰不存在", cloth, "");
		} else {
			Cloth temp = clothList.get(0);
			cloth.setId(temp.getId());
			EM.getEntityManager().remove(EM.getEntityManager().merge(cloth));
			EM.getEntityManager().getTransaction().commit();
			return new Result(1, "删除成功", cloth, "");
		}
	}
	
	@POST  
	@Path("/uploadImage")
	@Consumes("multipart/form-data")
	@Produces("application/json;charset=UTF-8")  
	@Permission("admin")  
	public Result uploadImage(@QueryParam("code") String suitCode) {
	    // 创建DiskFileItem工厂
	    DiskFileItemFactory factory = new DiskFileItemFactory();
	    // 设置缓存目录，不存在则创建目录
	    File tempDirectory = new File("D:/restful_temp");
	    if (!tempDirectory.exists()) {
	        tempDirectory.mkdirs();
	    }
	    factory.setRepository(tempDirectory);
	    // 设置缓冲区大小,文件体积超出缓冲区大小将保持至缓存目录然后再进行后续处理，这里设置为1M bytes
	    factory.setSizeThreshold(1024 * 1024);
	    // 创建文件上传解析对象
	    ServletFileUpload upload = new ServletFileUpload(factory);
	    // 按照UTF-8编码格式读取
	    upload.setHeaderEncoding("UTF-8");
	    // 设置每个文件最大为5M
	    upload.setFileSizeMax(5 * 1024 * 1024);
	    // 一共最多能上传10M
	    upload.setSizeMax(10 * 1024 * 1024);
	    
	    ServletContext context = request.getServletContext();
	    String uploadDirectory = context.getRealPath("/images/data/suits/");
	    // 获取文件保存目录，不存在则创建目录
	    File suitsDirectory = new File(uploadDirectory);
	    if (!suitsDirectory.exists()) {
	        suitsDirectory.mkdirs();
	    }
	    try {
	        List<FileItem> fileItems = upload.parseRequest(request);
	        /*System.out.println(fileItems.size());*/
	        // 解析并保存
	        for (FileItem fileItem : fileItems) {
	            String fileName = fileItem.getName();
	            /*System.out.println(fileName);*/
	            String filePath = uploadDirectory + "/" + fileName;
	            fileItem.write(new File(filePath));
	            return new Result(1, "上传成功", null, filePath);
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        return new Result(0, "服务器文件解析错误", null, "");
	    }
	    return new Result(0, "未发现可供服务保存的数据", null, "");
	}
}
