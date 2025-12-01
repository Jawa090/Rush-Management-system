import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, Plus, Edit, Trash2, Search, Eye, Volume2 } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

export default function AdminDuasManagement() {
  const { showSuccess } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const mockDuas = [
    {
      id: 1,
      title: "Morning Dua",
      arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
      transliteration: "Asbahna wa asbahal mulku lillah",
      translation: "We have entered the morning and the dominion belongs to Allah",
      category: "Morning",
      views: 456,
      favorites: 89,
      status: "active"
    },
    {
      id: 2,
      title: "Evening Dua",
      arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ",
      transliteration: "Amsayna wa amsal mulku lillah",
      translation: "We have entered the evening and the dominion belongs to Allah",
      category: "Evening",
      views: 398,
      favorites: 76,
      status: "active"
    },
    {
      id: 3,
      title: "Before Eating",
      arabic: "بِسْمِ اللَّهِ",
      transliteration: "Bismillah",
      translation: "In the name of Allah",
      category: "Daily",
      views: 523,
      favorites: 112,
      status: "active"
    },
    {
      id: 4,
      title: "After Eating",
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا",
      transliteration: "Alhamdulillahil-ladhi at'amana",
      translation: "Praise be to Allah who has fed us",
      category: "Daily",
      views: 445,
      favorites: 95,
      status: "active"
    },
    {
      id: 5,
      title: "Before Sleep",
      arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
      transliteration: "Bismika Allahumma amutu wa ahya",
      translation: "In Your name O Allah, I die and I live",
      category: "Night",
      views: 367,
      favorites: 82,
      status: "active"
    }
  ];

  const categories = ["Morning", "Evening", "Daily", "Night", "Travel", "Special Occasions"];

  const filteredDuas = mockDuas.filter(dua =>
    dua.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dua.transliteration.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddDua = () => {
    showSuccess("Dua Added", "New dua has been added successfully.");
    setIsAddDialogOpen(false);
  };

  const handleDelete = (title: string) => {
    showSuccess("Dua Deleted", `${title} has been removed.`);
  };

  const stats = {
    total: mockDuas.length,
    active: mockDuas.filter(d => d.status === 'active').length,
    totalViews: mockDuas.reduce((sum, d) => sum + d.views, 0),
    totalFavorites: mockDuas.reduce((sum, d) => sum + d.favorites, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Duas Management</h1>
          <p className="text-muted-foreground">Manage Islamic duas and supplications</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Dua
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Dua</DialogTitle>
              <DialogDescription>Add a new dua to the collection</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="duaTitle">Title</Label>
                <Input id="duaTitle" placeholder="e.g., Morning Dua" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select className="w-full p-2 border border-border rounded-md bg-background">
                  {categories.map((cat) => (
                    <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="arabic">Arabic Text</Label>
                <Textarea 
                  id="arabic" 
                  placeholder="Enter Arabic text..." 
                  rows={3}
                  className="text-right font-arabic text-lg"
                  dir="rtl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transliteration">Transliteration</Label>
                <Textarea id="transliteration" placeholder="Enter transliteration..." rows={2} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="translation">English Translation</Label>
                <Textarea id="translation" placeholder="Enter English translation..." rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="audioUrl">Audio URL (Optional)</Label>
                <Input id="audioUrl" placeholder="https://example.com/audio.mp3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddDua}>Add Dua</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Duas</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <Heart className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalViews}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Favorites</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalFavorites}</p>
              </div>
              <Heart className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Duas List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              All Duas
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search duas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredDuas.map((dua) => (
            <div key={dua.id} className="p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{dua.title}</h3>
                    <Badge variant="outline">{dua.category}</Badge>
                    <Badge variant="default">{dua.status}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-right text-xl font-arabic" dir="rtl">{dua.arabic}</p>
                    </div>
                    <p className="text-sm italic text-muted-foreground">{dua.transliteration}</p>
                    <p className="text-sm">{dua.translation}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{dua.views} views</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      <span>{dua.favorites} favorites</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(dua.title)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}