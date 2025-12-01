import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Laptop, Plus, Edit, Trash2, Search, Package, User, Calendar, Download } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

export default function AdminAccessories() {
  const { showSuccess } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  const mockAccessories = [
    {
      id: 1,
      name: "MacBook Pro 16 inch",
      category: "Laptop",
      serialNumber: "MBP2024001",
      assignedTo: "John Doe",
      assignedDate: "2024-01-10",
      status: "assigned",
      condition: "excellent",
      value: "$2,500"
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      category: "Mobile Phone",
      serialNumber: "IPH2024045",
      assignedTo: "Sarah Smith",
      assignedDate: "2024-01-12",
      status: "assigned",
      condition: "good",
      value: "$1,200"
    },
    {
      id: 3,
      name: "Dell Monitor 27 inch",
      category: "Monitor",
      serialNumber: "MON2024089",
      assignedTo: "Mike Johnson",
      assignedDate: "2024-01-08",
      status: "assigned",
      condition: "excellent",
      value: "$400"
    },
    {
      id: 4,
      name: "Logitech Keyboard",
      category: "Keyboard",
      serialNumber: "KEY2024123",
      assignedTo: null,
      assignedDate: null,
      status: "available",
      condition: "new",
      value: "$80"
    },
    {
      id: 5,
      name: "HP Laptop",
      category: "Laptop",
      serialNumber: "HPL2024056",
      assignedTo: null,
      assignedDate: null,
      status: "maintenance",
      condition: "fair",
      value: "$800"
    },
    {
      id: 6,
      name: "iPad Pro",
      category: "Tablet",
      serialNumber: "IPD2024034",
      assignedTo: "Emily Brown",
      assignedDate: "2024-01-15",
      status: "assigned",
      condition: "excellent",
      value: "$1,000"
    }
  ];

  const categories = ["Laptop", "Mobile Phone", "Tablet", "Monitor", "Keyboard", "Mouse", "Headset", "Other"];

  const filteredAccessories = mockAccessories.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (item.assignedTo && item.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddAccessory = () => {
    showSuccess("Accessory Added", "New accessory has been added to inventory.");
    setIsAddDialogOpen(false);
  };

  const handleAssign = () => {
    showSuccess("Accessory Assigned", "Accessory has been assigned to employee.");
    setIsAssignDialogOpen(false);
  };

  const handleDelete = (name: string) => {
    showSuccess("Accessory Deleted", `${name} has been removed from inventory.`);
  };

  const stats = {
    total: mockAccessories.length,
    assigned: mockAccessories.filter(a => a.status === 'assigned').length,
    available: mockAccessories.filter(a => a.status === 'available').length,
    maintenance: mockAccessories.filter(a => a.status === 'maintenance').length,
    totalValue: mockAccessories.reduce((sum, a) => sum + parseInt(a.value.replace(/[$,]/g, '')), 0)
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
      assigned: "default",
      available: "secondary",
      maintenance: "outline"
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employee Accessories</h1>
          <p className="text-muted-foreground">Manage company assets and employee equipment</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Accessory
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Accessory</DialogTitle>
                <DialogDescription>Add a new item to the inventory</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="itemName">Item Name</Label>
                    <Input id="itemName" placeholder="e.g., MacBook Pro 16 inch" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat.toLowerCase().replace(/\s+/g, '-')}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serialNumber">Serial Number</Label>
                    <Input id="serialNumber" placeholder="e.g., MBP2024001" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="value">Value ($)</Label>
                    <Input id="value" type="number" placeholder="2500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Additional details about the item..." rows={3} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddAccessory}>Add Accessory</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Assigned</p>
                <p className="text-2xl font-bold text-green-600">{stats.assigned}</p>
              </div>
              <User className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-blue-600">{stats.available}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Maintenance</p>
                <p className="text-2xl font-bold text-orange-600">{stats.maintenance}</p>
              </div>
              <Package className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-purple-600">${stats.totalValue.toLocaleString()}</p>
              </div>
              <Package className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accessories List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            All Accessories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search accessories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {filteredAccessories.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Laptop className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      {getStatusBadge(item.status)}
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>SN: {item.serialNumber}</span>
                      <span>•</span>
                      <span>Condition: {item.condition}</span>
                      <span>•</span>
                      <span>Value: {item.value}</span>
                      {item.assignedTo && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {item.assignedTo}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {item.status === 'available' && (
                    <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <User className="h-4 w-4 mr-1" />
                          Assign
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Assign Accessory</DialogTitle>
                          <DialogDescription>Assign {item.name} to an employee</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="employee">Select Employee</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose employee" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="john">John Doe</SelectItem>
                                <SelectItem value="sarah">Sarah Smith</SelectItem>
                                <SelectItem value="mike">Mike Johnson</SelectItem>
                                <SelectItem value="emily">Emily Brown</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="assignDate">Assignment Date</Label>
                            <Input id="assignDate" type="date" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea id="notes" placeholder="Additional notes..." rows={2} />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>Cancel</Button>
                          <Button onClick={handleAssign}>Assign</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(item.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}