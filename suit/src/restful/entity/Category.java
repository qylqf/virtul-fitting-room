package restful.entity;

import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "category")
@NamedQueries({
    @NamedQuery(name = "Category.queryAllCategory", query = "SELECT category FROM Category category"),
    @NamedQuery(name = "Category.queryCategoryByNumber", query = "SELECT category FROM Category category WHERE category.number = :number")
})
public class Category extends IdEntity {
	private String number;
	private String name;
	
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
}
