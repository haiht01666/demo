package service;

import java.util.List;

import model.Article;

public interface ArticleService {
	public List<Article> getAllArticle();

    int getNumberArticle();

    List<Article> getArticlePage(int limit, int offset);

    public Article getArticleById(int id);

    boolean existArticle(int id);

    public int updateArticle(Article article);
	
	public int deleteArticle(int id);
	
	public int createArticle(Article article);
}
