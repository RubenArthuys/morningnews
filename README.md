# morningnews

Il fallait que je change mon schéma d'articles, pour que les keys correspondent au JSON de newsAPI ...
Pour que le backend puisse charger les mêmes keys, et les afficher dans My Articles.

var articlesSchema = mongoose.Schema({
    title: String,
    description: String,
    content: String,
    urlToImage: String
})

Les keys à changer aussi dans la route delete, et dans le fetch delete de ScreenMyArticles