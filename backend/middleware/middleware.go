package middleware

import (
	"net/http"

	"github.com/KUNSALISA/ManageFlight/services"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token is missing"})
			c.Abort()
			return
		}

		token, err := jwt.ParseWithClaims(tokenString, &services.JwtClaim{}, func(token *jwt.Token) (interface{}, error) {
			return []byte("Manage"), nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		c.Next()
	}
}

// package middleware

// import (
// 	"net/http"

// 	"github.com/KUNSALISA/ManageFlight/services"
// 	_"github.com/dgrijalva/jwt-go"
// 	"github.com/gin-gonic/gin"
// )

// func AuthMiddleware() gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		tokenString := c.GetHeader("Authorization")
// 		if tokenString == "" {
// 			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token is missing"})
// 			c.Abort()
// 			return
// 		}

// 		var jwtWrapper services.JwtWrapper
// 		jwtWrapper.SecretKey = "Manage" // SecretKey ของคุณ
// 		jwtWrapper.Issuer = "ManageFlight"

// 		claims, err := jwtWrapper.ValidateToken(tokenString)
// 		if err != nil {
// 			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
// 			c.Abort()
// 			return
// 		}

// 		c.Set("email", claims.Email)
// 		c.Next()
// 	}
// }

