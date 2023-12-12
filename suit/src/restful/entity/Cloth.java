package restful.entity;

import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "cloth")
@NamedQueries({
    @NamedQuery(name = "Cloth.queryAllCloth", query = "SELECT cloth FROM Cloth cloth"),
    @NamedQuery(name = "Cloth.queryClothByNumber", query = "SELECT cloth FROM Cloth cloth WHERE cloth.number = :number"),
    @NamedQuery(name = "Cloth.queryClothBySexAndType", query = "SELECT cloth FROM Cloth cloth WHERE cloth.sex = :sex AND cloth.type = :type"),
    @NamedQuery(name = "Cloth.queryClothBySex", query = "SELECT cloth FROM Cloth cloth WHERE cloth.sex = :sex"),
    @NamedQuery(name = "Cloth.queryClothByType", query = "SELECT cloth FROM Cloth cloth WHERE cloth.type = :type")
})
public class Cloth extends IdEntity {
	private String number;
	private String name;
	private Double price;
	private Boolean sex;
	private String type;
	private String image;
	
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public Boolean getSex() {
		return sex;
	}
	public void setSex(Boolean sex) {
		this.sex = sex;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	
	
}
