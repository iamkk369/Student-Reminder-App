"""Home Page Validation Script - Sprint 3B"""
import re
import sys

def check_html(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    print("=" * 60)
    print("HOME PAGE VALIDATION")
    print("=" * 60)

    # 1. CDATA Check
    print("\n[1] CDATA Wrapper Check")
    has_cdata = '<![CDATA[' in content or ']]>' in content
    print(f"  CDATA present: {'FAIL' if has_cdata else 'PASS'}")

    # 2. Section Check
    print("\n[2] Required Sections")
    sections = {
        'NAVBAR': 'NAVBAR',
        'HERO SECTION': 'HERO SECTION',
        'WHY CHOOSE US': 'WHY CHOOSE US',
        'FEATURES OVERVIEW': 'FEATURES OVERVIEW',
        'HOW IT WORKS': 'HOW IT WORKS',
        'REMINDER CATEGORIES': 'REMINDER CATEGORIES',
        'DASHBOARD PREVIEW': 'DASHBOARD PREVIEW',
        'STATISTICS': 'STATISTICS',
        'TESTIMONIALS': 'TESTIMONIALS',
        'CALL TO ACTION': 'CALL TO ACTION',
        'FOOTER': 'FOOTER'
    }
    all_sections_ok = True
    for name, marker in sections.items():
        found = marker in content
        if not found:
            all_sections_ok = False
        print(f"  {name}: {'PASS' if found else 'MISSING'}")

    # 3. Demo Anchor Check
    print("\n[3] Demo Anchor")
    demo_ok = 'id="demo"' in content and 'href="#demo"' in content
    print(f"  id='demo' + href='#demo': {'PASS' if demo_ok else 'FAIL'}")

    # 4. Tag Balance
    print("\n[4] Tag Balance")
    tags = re.findall(r'<(/?)([a-z0-9]+)[^>]*>', content, re.IGNORECASE)
    stack = []
    balanced = True
    void_tags = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}
    for closing, tag in tags:
        tag = tag.lower()
        if not closing:
            if tag not in void_tags:
                stack.append(tag)
        else:
            if not stack or stack.pop() != tag:
                balanced = False
                break
    if stack:
        balanced = False
        print(f"  Unclosed tags: {stack}")
    print(f"  Tag balance: {'PASS' if balanced else 'FAIL'}")

    # 5. Icon References
    print("\n[5] Icon References Used")
    icons = sorted(set(re.findall(r'#icon-([a-z-]+)', content)))
    print(f"  Icons: {icons}")

    # 6. Class References vs Home CSS
    print("\n[6] CSS File Checks")
    with open('assets/css/home.css', 'r', encoding='utf-8') as f:
        css_content = f.read()
    css_cdata = '<![CDATA[' in css_content or ']]>' in css_content
    print(f"  home.css CDATA: {'FAIL' if css_cdata else 'PASS'}")
    invalid_ending = '</arg_value></tool_call>' in css_content
    print(f"  home.css invalid ending: {'FAIL' if invalid_ending else 'PASS'}")

    # 7. SVG File Checks
    print("\n[7] SVG File Checks")
    with open('assets/icons/icons.svg', 'r', encoding='utf-8') as f:
        svg_content = f.read()
    svg_cdata = '<![CDATA[' in svg_content or ']]>' in svg_content
    print(f"  icons.svg CDATA: {'FAIL' if svg_cdata else 'PASS'}")
    # Verify all referenced icons exist
    missing_icons = []
    for icon in icons:
        if f'id="icon-{icon}"' not in svg_content:
            missing_icons.append(icon)
    print(f"  Missing icon definitions: {missing_icons if missing_icons else 'NONE - PASS'}")

    with open('assets/icons/logo.svg', 'r', encoding='utf-8') as f:
        logo_content = f.read()
    logo_cdata = '<![CDATA[' in logo_content or ']]>' in logo_content
    print(f"  logo.svg CDATA: {'FAIL' if logo_cdata else 'PASS'}")

    # 8. Check for missing class definitions in home.css
    print("\n[8] Class Definition Check")
    used_classes = set()
    for cls in re.findall(r'class="([^"]+)"', content):
        for c in cls.split():
            if c and not c.startswith('d-lg') and not c.startswith('d-md'):
                used_classes.add(c)

    css_classes = set(re.findall(r'\.([a-zA-Z][a-zA-Z0-9_-]*)', css_content))
    # Also check components.css for classes
    with open('assets/css/components.css', 'r', encoding='utf-8') as f:
        components = f.read()
    css_classes.update(re.findall(r'\.([a-zA-Z][a-zA-Z0-9_-]*)', components))
    with open('assets/css/utilities.css', 'r', encoding='utf-8') as f:
        utilities = f.read()
    css_classes.update(re.findall(r'\.([a-zA-Z][a-zA-Z0-9_-]*)', utilities))
    with open('assets/css/layout.css', 'r', encoding='utf-8') as f:
        layout = f.read()
    css_classes.update(re.findall(r'\.([a-zA-Z][a-zA-Z0-9_-]*)', layout))
    with open('assets/css/typography.css', 'r', encoding='utf-8') as f:
        typography = f.read()
    css_classes.update(re.findall(r'\.([a-zA-Z][a-zA-Z0-9_-]*)', typography))
    with open('assets/css/responsive.css', 'r', encoding='utf-8') as f:
        responsive = f.read()
    css_classes.update(re.findall(r'\.([a-zA-Z][a-zA-Z0-9_-]*)', responsive))

    missing = []
    for cls in sorted(used_classes):
        # Handle responsive breakpoint prefixed classes
        base = cls
        for prefix in ['col-md-', 'col-lg-', 'mb-', 'mt-', 'flex-sm-', 'd-']:
            if prefix in cls:
                base = cls
                break
        if base not in css_classes:
            missing.append(cls)

    if missing:
        print(f"  Missing classes: {missing}")
    else:
        print("  All classes found: PASS")

    print("\n" + "=" * 60)
    print("VALIDATION COMPLETE")
    print("=" * 60)

if __name__ == '__main__':
    check_html('pages/index.html')