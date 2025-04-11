import React, { useState, useEffect, useRef } from "react"
import {
  AppBar, Toolbar, Button, Box, Container, IconButton, Drawer, List, ListItem,
  ListItemText, Collapse, useMediaQuery, useTheme, Paper, Popper,
  ThemeProvider, createTheme
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import "./component.css"
import logo from "../../assets/images/iiitdlogo.png"

const theme = createTheme({
  palette: {
    primary: { main: "#00B2B2", dark: "#009494", light: "#4DCECE", contrastText: "#ffffff" },
    secondary: { main: "#FF6B6B", dark: "#E05252", light: "#FF9494", contrastText: "#ffffff" }
  }
})

const SiteHeader = () => {
  const muiTheme = useTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState({})
  const [activeParentMenu, setActiveParentMenu] = useState(null)
  const [activeParentAnchorEl, setActiveParentAnchorEl] = useState(null)
  const [activeChildMenu, setActiveChildMenu] = useState(null)
  const [activeChildAnchorEl, setActiveChildAnchorEl] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const parentMenuRef = useRef(null)
  const childMenuRef = useRef(null)
  const hoveredMenuRef = useRef(null)

  const navItems = [
    {
      label: "Our Services",
      children: [
        { label: "Facilitate Innovation", path: "/Services/Facilitate_Innovation" },
        { label: "Startup Facilitation", path: "/Services/Startup_Facilitation" },
        { label: "Technology Licensing", path: "/Services/Tech_Licensing" },
        { label: "IPR Management", path: "/Services/IPR_Management" },
        { label: "Technology Assessment", path: "/Services/Tech_Assessment" }
      ]
    },
    {
      label: "Our Technology",
      children: [
        { label: "Our Technology", path: "/Our_Technology" },
        { label: "Our Research", path: "/Our_Research" }
      ]
    },
    {
      label: "Resources",
      children: [
        { label: "Students", path: "/Resources/Student" },
        { label: "Faculty & Staff", path: "/Resources/Faculty" },
        { label: "Partners", path: "/Resources/Partner" },
        // {
          // label: "IIITD",
          // children: [
          //   { label: "Students", path: "/Resources/IIITD/Student" },
          //   { label: "Faculty & Staff", path: "/Resources/IIITD/Faculty" },
          //   { label: "Partners", path: "/Resources/IIITD/Partner" }
          // ]
        // }
      ]
    },
    { label: "Collaborate", path: "/Collaborate" },
    { label: "Events", path: "/Event" }
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => resetAllMenus(), [isMobile])

  useEffect(() => {
    if (drawerOpen) document.body.classList.add("no-scroll")
    else document.body.classList.remove("no-scroll")
    return () => document.body.classList.remove("no-scroll")
  }, [drawerOpen])

  const resetAllMenus = () => {
    setActiveParentMenu(null)
    setActiveParentAnchorEl(null)
    setActiveChildMenu(null)
    setActiveChildAnchorEl(null)
    hoveredMenuRef.current = null
  }

  const toggleDrawer = () => setDrawerOpen(!drawerOpen)
  
  const handleExpandItem = (item) => {
    setExpandedItems({...expandedItems, [item]: !expandedItems[item]})
  }

  const handleParentMenuEnter = (event, item) => {
    if (!isMobile) {
      if (activeParentMenu && activeParentMenu !== item) {
        setActiveChildMenu(null)
        setActiveChildAnchorEl(null)
      }
      hoveredMenuRef.current = item
      setActiveParentMenu(item)
      setActiveParentAnchorEl(event.currentTarget)
    }
  }

  const handleParentMenuLeave = () => {
    if (!isMobile) {
      hoveredMenuRef.current = null
      // Removed setTimeout to instantly close menus
      if (!hoveredMenuRef.current) {
        setActiveParentMenu(null)
        setActiveParentAnchorEl(null)
        setActiveChildMenu(null)
        setActiveChildAnchorEl(null)
      }
    }
  }

  const handleChildMenuEnter = (event, parentItem, childItem) => {
    if (!isMobile) {
      event.stopPropagation()
      hoveredMenuRef.current = `${parentItem}-${childItem}`
      setActiveChildMenu(childItem)
      setActiveChildAnchorEl(event.currentTarget)
    }
  }

  const handleChildMenuLeave = () => {
    if (!isMobile) {
      hoveredMenuRef.current = null
      // Removed setTimeout to instantly close menus
      if (!hoveredMenuRef.current) {
        setActiveChildMenu(null)
        setActiveChildAnchorEl(null)
      }
    }
  }

  const handleNonSubmenuHover = (parentItem) => {
    if (!isMobile) {
      setActiveChildMenu(null)
      setActiveChildAnchorEl(null)
      hoveredMenuRef.current = parentItem
    }
  }

  const handleDropdownEnter = (parentItem) => {
    if (!isMobile) hoveredMenuRef.current = parentItem
  }

  const handleSubmenuEnter = (parentItem, childItem) => {
    if (!isMobile) hoveredMenuRef.current = `${parentItem}-${childItem}`
  }

  const renderMobileNestedItems = (items, level = 0) => {
    return items.map((item, index) => (
      <React.Fragment key={index}>
        {item.children ? (
          <>
            <ListItem 
              button 
              onClick={() => handleExpandItem(item.label)}
              className={level === 0 ? "drawer-list-item" : level === 1 ? "drawer-nested-item" : "drawer-sub-nested-item"}
            >
              <ListItemText primary={item.label} />
              {expandedItems[item.label] ? 
                <ExpandLessIcon style={{ color: "#00B2B2" }} /> : 
                <ExpandMoreIcon style={{ color: "#00B2B2" }} />}
            </ListItem>
            <Collapse in={expandedItems[item.label]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderMobileNestedItems(item.children, level + 1)}
              </List>
            </Collapse>
          </>
        ) : (
          <ListItem 
            button 
            component="a" 
            href={item.path}
            className={level === 0 ? "drawer-list-item" : level === 1 ? "drawer-nested-item" : "drawer-sub-nested-item"}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        )}
      </React.Fragment>
    ))
  }

  const renderMobileMenu = () => (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer} className="mobile-drawer">
      <Box className="drawer-container">
        <Box className="drawer-header">
          <img src={logo || "/placeholder.svg"} alt="IIITD Logo" className="drawer-logo" 
            onClick={() => (window.location.href = '/')} style={{ cursor: "pointer" }}/>
        </Box>
        <List className="drawer-list">
          {renderMobileNestedItems(navItems)}
          <ListItem className="drawer-contact-button">
            <Button variant="contained" color="primary" fullWidth component="a" href="/Contact_Us">
              Contact Us
            </Button>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )

  const renderDesktopMenu = () => (
    <Box className="desktop-menu">
      {navItems.map((item, index) => (
        <Box
          key={index}
          className={`menu-item ${activeParentMenu === item.label ? 'active' : ''}`}
          onMouseEnter={(e) => handleParentMenuEnter(e, item.label)}
          onMouseLeave={handleParentMenuLeave}
        >
          {item.children ? (
            <>
              <Button 
                className={`nav-button ${activeParentMenu === item.label ? 'active' : ''}`} 
                endIcon={activeParentMenu === item.label ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              >
                {item.label}
              </Button>
              <Popper
                open={activeParentMenu === item.label}
                anchorEl={activeParentAnchorEl}
                placement="bottom-start"
                // Removed transition prop
                className="menu-popper"
                modifiers={[{
                  name: 'preventOverflow',
                  enabled: true,
                  options: { altAxis: true, boundary: document.body }
                }]}
              >
                {/* Removed Fade component wrapper */}
                <Paper 
                  className="dropdown-paper"
                  onMouseEnter={() => handleDropdownEnter(item.label)}
                  onMouseLeave={handleParentMenuLeave}
                  ref={parentMenuRef}
                >
                  <Box className="dropdown-container">
                    {item.children.map((child, childIndex) => (
                      <Box
                        key={childIndex}
                        className={`dropdown-item ${activeChildMenu === child.label ? 'active' : ''}`}
                        onMouseEnter={
                          child.children 
                            ? (e) => handleChildMenuEnter(e, item.label, child.label) 
                            : () => handleNonSubmenuHover(item.label)
                        }
                        onMouseLeave={child.children ? handleChildMenuLeave : null}
                      >
                        {child.children ? (
                          <>
                            <Button
                              className={`dropdown-button ${activeChildMenu === child.label ? 'active' : ''}`}
                              endIcon={activeChildMenu === child.label ? 
                                <ExpandLessIcon style={{ color: "#00B2B2" }} /> : 
                                <ExpandMoreIcon style={{ color: "#00B2B2" }} />
                              }
                            >
                              {child.label}
                            </Button>
                            <Popper
                              open={activeChildMenu === child.label}
                              anchorEl={activeChildAnchorEl}
                              placement="right-start"
                              // Removed transition prop
                              className="submenu-popper"
                              modifiers={[{
                                name: 'preventOverflow',
                                enabled: true,
                                options: { altAxis: true, boundary: document.body }
                              }]}
                            >
                              {/* Removed Fade component wrapper */}
                              <Paper 
                                className="submenu-paper"
                                onMouseEnter={() => handleSubmenuEnter(item.label, child.label)}
                                onMouseLeave={handleChildMenuLeave}
                                ref={childMenuRef}
                              >
                                <Box className="submenu-container">
                                  {child.children.map((subChild, subChildIndex) => (
                                    <Button
                                      key={subChildIndex}
                                      component="a"
                                      href={subChild.path}
                                      className="submenu-button"
                                    >
                                      {subChild.label}
                                    </Button>
                                  ))}
                                </Box>
                              </Paper>
                            </Popper>
                          </>
                        ) : (
                          <Button component="a" href={child.path} className="dropdown-button">
                            {child.label}
                          </Button>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Popper>
            </>
          ) : (
            <Button component="a" href={item.path} className="nav-button">
              {item.label}
            </Button>
          )}
        </Box>
      ))}
    </Box>
  )

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" className={`site-header ${scrolled ? "scrolled" : ""}`} elevation={scrolled ? 3 : 1}>
        <Container maxWidth="xl">
          <Toolbar disableGutters className="toolbar">
            <Box className="logo-container">
              <img src={logo || "/placeholder.svg"} alt="IIITD Logo" className="logo" 
                onClick={() => (window.location.href = '/')} style={{ cursor: "pointer" }}/>
            </Box>
            {isMobile ? (
              <IconButton color="inherit" aria-label="open drawer" edge="start" 
                onClick={toggleDrawer} className="menu-button">
                <MenuIcon />
              </IconButton>
            ) : (
              <>
                {renderDesktopMenu()}
                <Button variant="contained" color="primary" component="a" 
                  href="/Contact_Us" className="contact-button">
                  Contact Us
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
        {renderMobileMenu()}
      </AppBar>
    </ThemeProvider>
  )
}

export default SiteHeader