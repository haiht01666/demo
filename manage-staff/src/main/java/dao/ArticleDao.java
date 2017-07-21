package dao;

import java.util.List;

import model.Article;

public interface ArticleDao {
	public List<Article> getAllArticle();

    List<Article> getArticlePage(int limit, int offset);

    public Article getArticleById(int id);

    boolean existArticle(int id);

    public int updateArticle(Article article);
	
	public int deleteArticle(int id);
	
	public int createArticle(Article article);

    int getNumberArticle();
    
    public List<Article> getHomeArticle();
    
    public int updateHome(Article article);
	
	public int deleteHome(int id);
	
	public Article getHomeById(int id);
}
