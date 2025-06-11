import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Star,
  Heart,
  ShoppingCart,
  Share2,
  BookOpen,
  Calendar,
  User,
  Building,
  Globe,
  Package,
  ArrowLeft,
  Plus,
  Minus,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { getBookById, books } from "@/lib/books-data";
import { cn } from "@/lib/utils";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const book = getBookById(id || "");

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Book Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The book you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/browse">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedBooks = books
    .filter(
      (b) =>
        b.id !== book.id &&
        (b.category === book.category || b.author === book.author),
    )
    .slice(0, 4);

  const discountPercentage = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0;

  // Mock review data
  const reviewStats = [
    { stars: 5, count: 234, percentage: 68 },
    { stars: 4, count: 89, percentage: 26 },
    { stars: 3, count: 15, percentage: 4 },
    { stars: 2, count: 4, percentage: 1 },
    { stars: 1, count: 3, percentage: 1 },
  ];

  const mockReviews = [
    {
      id: "1",
      userName: "Sarah M.",
      rating: 5,
      comment:
        "Absolutely incredible! This book kept me up all night reading. The characters are so well-developed and the plot twists are amazing.",
      date: "2024-01-15",
      verified: true,
    },
    {
      id: "2",
      userName: "John D.",
      rating: 4,
      comment:
        "Really enjoyed this book. Great writing style and engaging story. Would definitely recommend to others.",
      date: "2024-01-10",
      verified: true,
    },
    {
      id: "3",
      userName: "Emily R.",
      rating: 5,
      comment:
        "One of the best books I've read this year! The author has a unique voice and creates such vivid imagery.",
      date: "2024-01-08",
      verified: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/browse" className="hover:text-foreground">
            Browse
          </Link>
          <span className="mx-2">/</span>
          <Link
            to={`/categories/${book.category.toLowerCase().replace(/\s+/g, "-")}`}
            className="hover:text-foreground"
          >
            {book.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{book.title}</span>
        </div>

        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Book Cover */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full max-w-md mx-auto h-auto rounded-lg shadow-lg"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {book.bestseller && (
                  <Badge variant="destructive">Bestseller</Badge>
                )}
                {book.newRelease && (
                  <Badge variant="secondary">New Release</Badge>
                )}
                {discountPercentage > 0 && (
                  <Badge variant="default">-{discountPercentage}%</Badge>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Book Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">
                {book.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <Link
                to={`/authors/${book.author.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-lg text-muted-foreground hover:text-primary transition-colors"
              >
                by {book.author}
              </Link>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "h-5 w-5",
                      star <= Math.floor(book.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300",
                    )}
                  />
                ))}
              </div>
              <span className="text-lg font-medium">{book.rating}</span>
              <span className="text-muted-foreground">
                ({book.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-primary">
                  ${book.price.toFixed(2)}
                </span>
                {book.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${book.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {discountPercentage > 0 && (
                <p className="text-sm text-green-600">
                  You save ${(book.originalPrice! - book.price).toFixed(2)} (
                  {discountPercentage}% off)
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  "h-3 w-3 rounded-full",
                  book.inStock ? "bg-green-500" : "bg-red-500",
                )}
              />
              <span
                className={cn(
                  "font-medium",
                  book.inStock ? "text-green-600" : "text-red-600",
                )}
              >
                {book.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Purchase Options */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Quantity */}
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">Quantity:</span>
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-4 py-2 min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                        disabled={quantity >= 10}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      disabled={!book.inStock}
                      size="lg"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {book.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart
                        className={cn(
                          "h-4 w-4",
                          isFavorite ? "fill-red-500 text-red-500" : "",
                        )}
                      />
                    </Button>
                  </div>

                  {/* Additional Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      Add to Wishlist
                    </Button>
                    <Button variant="outline" size="sm">
                      Buy Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Book Details Tabs */}
        <Tabs defaultValue="details" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({book.reviewCount})
            </TabsTrigger>
            <TabsTrigger value="recommendations">More Like This</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Book Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">ISBN:</span>
                      <span>{book.isbn}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Publisher:</span>
                      <span>{book.publisher}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Published:</span>
                      <span>
                        {new Date(book.publishedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Pages:</span>
                      <span>{book.pages}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Language:</span>
                      <span>{book.language}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Category:</span>
                      <Link
                        to={`/categories/${book.category.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-primary hover:underline"
                      >
                        {book.category}
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Review Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold mb-2">{book.rating}</div>
                    <div className="flex justify-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "h-5 w-5",
                            star <= Math.floor(book.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300",
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Based on {book.reviewCount} reviews
                    </p>
                  </div>

                  <div className="space-y-2">
                    {reviewStats.map((stat) => (
                      <div
                        key={stat.stars}
                        className="flex items-center space-x-2"
                      >
                        <span className="text-sm w-8">{stat.stars}★</span>
                        <Progress value={stat.percentage} className="flex-1" />
                        <span className="text-sm text-muted-foreground w-8">
                          {stat.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews List */}
              <div className="lg:col-span-2 space-y-4">
                {mockReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium">
                              {review.userName}
                            </span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={cn(
                                  "h-4 w-4",
                                  star <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300",
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="mt-6">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">You Might Also Like</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedBooks.map((relatedBook) => (
                  <BookCard key={relatedBook.id} book={relatedBook} />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default BookDetails;
