package dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import model.Category;
import model.Product;

@Repository public class ProductDaoImpl extends DBManager implements ProductDao {

    @Override public List<Category> getAllCategory() {
        List<Category> result = new ArrayList<>();
        String sql = "SELECT id,name,category_key FROM categories;";
        try {
            conn = getConnection();
            st = conn.createStatement();
            rs = st.executeQuery(sql);
            while (rs.next()) {
                Category category = new Category();
                category.setId(rs.getInt(1));
                category.setName(rs.getString(2));
                category.setCategory_key(rs.getString(3));
                result.add(category);
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                    st.close();
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }

    @Override public List<Product> getAllProduct() {
        List<Product> result = new ArrayList<>();
        String sql = "SELECT id,name,cdate,price, image_url FROM products";
        try {
            conn = getConnection();
            st = conn.createStatement();
            rs = st.executeQuery(sql);
            while (rs.next()) {
                Product product = new Product();
                product.setId(rs.getInt(1));
                product.setName(rs.getString(2));
                product.setCdate(rs.getDate(3));
                product.setPrice(rs.getDouble(4));
                product.setImageUrl(rs.getString(5));
                result.add(product);
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                    st.close();
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }

    @Override public int getNumberProducts() {
        String sql = "SELECT count(*) FROM products";
        try {
            conn = getConnection();
            st = conn.createStatement();
            rs = st.executeQuery(sql);
            while (rs.next()) {
                return rs.getInt(1);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                    st.close();
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return 0;
    }

    @Override public int getNumberProductsSearch(String searchStr) {
        String sql = "SELECT count(*) FROM products p where p.name LIKE ? || p.characteristic LIKE ? || p.description LIKE ?";
        try {
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, "%" + searchStr + "%");
            stmt.setString(2, "%" + searchStr + "%");
            stmt.setString(3, "%" + searchStr + "%");
            rs = stmt.executeQuery();
            while (rs.next()) {
                return rs.getInt(1);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                    stmt.close();
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return 0;
    }

    @Override public int getNumberProductsCategory(String category) {
        String sql = "SELECT count(*) FROM products p join categories c on p.category_id = c.id WHERE c.category_key = ?";
        try {
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, category);
            rs = stmt.executeQuery();
            while (rs.next()) {
                return rs.getInt(1);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                    stmt.close();
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return 0;
    }

    @Override public List<Product> getProductPage(int limit, int offset) {
        List<Product> result = new ArrayList<>();
        String sql =
                "SELECT p.id,p.name,p.cdate,p.price, p.image_url, c.category_key,c.name  FROM products p join categories c on p.category_id = c.id order by cdate DESC LIMIT "
                        + limit + " OFFSET " + offset;
        try {
            conn = getConnection();
            st = conn.createStatement();
            rs = st.executeQuery(sql);
            while (rs.next()) {
                Product product = new Product();
                product.setId(rs.getInt(1));
                product.setName(rs.getString(2));
                product.setCdate(rs.getDate(3));
                product.setPrice(rs.getDouble(4));
                product.setImageUrl(rs.getString(5));
                product.setCategoryKey(rs.getString(6));
                product.setCategoryName(rs.getString(7));
                result.add(product);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                    st.close();
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }

    @Override public Product getProductById(int id) {
        Product product = new Product();
        String sql = "SELECT p.id,p.name,description,characteristic,price,category_id ,image_url,mail_product, c.name, c.category_key FROM products p  join categories c on p.category_id = c.id where p.id=?";
        try {
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, id);
            rs = stmt.executeQuery();
            while (rs.next()) {
                product.setId(rs.getInt(1));
                product.setName(rs.getString(2));
                product.setDetail(rs.getString(3));
                product.setCharacteristic(rs.getString(4));
                product.setPrice(rs.getDouble(5));
                product.setCategoryId(rs.getInt(6));
                product.setImageUrl(rs.getString(7));
                product.setMainProduct(rs.getBoolean(8));
                product.setCategoryName(rs.getString(9));
                product.setCategoryKey(rs.getString(10));
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                    stmt.close();
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return product;
    }

    @Override public boolean existProduct(int id) {
        String sql = "SELECT EXISTS(SELECT 1 FROM products WHERE id=?) COUNT";
        try {
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, id);
            rs = stmt.executeQuery();
            while (rs.next()) {
                return rs.getBoolean(1);
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                    stmt.close();
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return false;
    }

    @Override public int createProduct(Product product) {
        int result = 0;
        String sql = "insert into products(name,description,characteristic,price,category_id,image_url ,mail_product, cdate) values(?,?,?,?,?,?,?,now())";
        try {
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, product.getName());
            stmt.setString(2, product.getDetail());
            stmt.setString(3, product.getCharacteristic());
            stmt.setDouble(4, product.getPrice());
            stmt.setInt(5, product.getCategoryId());
            stmt.setString(6, product.getImageUrl());
            stmt.setBoolean(7, product.getMainProduct());
            result = stmt.executeUpdate();
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                    stmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }

    @Override public int updateProduct(Product product) {
        int result = 0;
        String sql = "update products set name = ? , description = ? , characteristic = ? , category_id = ?,image_url=? ,price = ?,mail_product=? where id = ?";
        try {
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, product.getName());
            stmt.setString(2, product.getDetail());
            stmt.setString(3, product.getCharacteristic());
            stmt.setInt(4, product.getCategoryId());
            stmt.setString(5, product.getImageUrl());
            stmt.setDouble(6, product.getPrice());
            stmt.setBoolean(7, product.getMainProduct());
            stmt.setInt(8, product.getId());
            result = stmt.executeUpdate();
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                    stmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }

    @Override public int deleteProduct(int id) {
        int result = 0;
        String sql = "delete from products where id = ?";
        try {
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, id);
            result = stmt.executeUpdate();
        } catch (Exception ex) {
            return 0;
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                    stmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }

    @Override public boolean existCategory(String category) {
        String sql = "SELECT EXISTS(SELECT 1 FROM categories WHERE category_key=?) COUNT";
        try {
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, category);
            rs = stmt.executeQuery();
            while (rs.next()) {
                return rs.getBoolean(1);
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                    stmt.close();
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return false;
    }

    @Override public List<Product> getProductsByCategory(int limit, int offset, String category) {
        List<Product> result = new ArrayList<>();
        String sql =
                "SELECT p.id,p.name,p.cdate,p.price, p.image_url, c.category_key,c.name  FROM products p join categories c on p.category_id = c.id WHERE c.category_key = ? order by cdate DESC LIMIT ? OFFSET ?";
        try {
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, category);
            stmt.setInt(2, limit);
            stmt.setInt(3, offset);
            rs = stmt.executeQuery();
            while (rs.next()) {
                Product product = new Product();
                product.setId(rs.getInt(1));
                product.setName(rs.getString(2));
                product.setCdate(rs.getDate(3));
                product.setPrice(rs.getDouble(4));
                product.setImageUrl(rs.getString(5));
                product.setCategoryKey(rs.getString(6));
                product.setCategoryName(rs.getString(7));
                result.add(product);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                    stmt.close();
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }

    @Override public List<Product> searchProduct(int limit, int offset, String searchStr) {
        List<Product> result = new ArrayList<>();
        String sql =
                "SELECT p.id,p.name,p.cdate,p.price, p.image_url, c.category_key,c.name  FROM products p join categories c on p.category_id = c.id  where p.name LIKE ? || p.characteristic LIKE ? || p.description LIKE ? order by cdate DESC LIMIT "
                        + limit + " OFFSET " + offset;
        try {
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, "%" + searchStr + "%");
            stmt.setString(2, "%" + searchStr + "%");
            stmt.setString(3, "%" + searchStr + "%");
            rs = stmt.executeQuery();
            while (rs.next()) {
                Product product = new Product();
                product.setId(rs.getInt(1));
                product.setName(rs.getString(2));
                product.setCdate(rs.getDate(3));
                product.setPrice(rs.getDouble(4));
                product.setImageUrl(rs.getString(5));
                product.setCategoryKey(rs.getString(6));
                product.setCategoryName(rs.getString(7));
                result.add(product);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                    stmt.close();
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }

}
