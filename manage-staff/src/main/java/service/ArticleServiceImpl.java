package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.ArticleDao;
import model.Article;

@Service
public class ArticleServiceImpl implements ArticleService {
	@Autowired
	ArticleDao dao;

	@Override
	public List<Article> getAllArticle() {
		return dao.getAllArticle();
	}

	@Override
	public Article getArticleById(int id) {
		return dao.getArticleById(id);
	}

	@Override
	public int updateArticle(Article article) {
		return dao.updateArticle(article);
	}

	@Override
	public int deleteArticle(int id) {
		return dao.deleteArticle(id);
	}

	@Override
	public int createArticle(Article article) {
		return dao.createArticle(article);
	}
}
