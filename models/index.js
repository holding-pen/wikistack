const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack'
    , {logging: false}
    );

const User = db.define('user', {
    name: {type: Sequelize.STRING, allowNull: false},
    email: {type: Sequelize.STRING, allowNull: false, isEmail: true}
});

const Page = db.define('page', {
    title: {type: Sequelize.STRING, allowNull: false, defaultValue: 'No title'},
    urlTitle: {type: Sequelize.STRING, allowNull: false},
    // date: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    content: {type: Sequelize.TEXT, allowNull: false, defaultValue: 'No text'},
    status: {type: Sequelize.ENUM('open', 'closed'), defaultValue: 'open'}
    },
    {
        getterMethods: {
            route: function () {return '/wiki/' + this.urlTitle}
        },
        hooks: {
            beforeValidate: function (page, options) {
                page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W+/g, '');
            }
        }
    }
);

Page.belongsTo(User, { as: 'author' });

module.exports = {
    Page: Page,
    User: User
}
