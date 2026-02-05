import React, { useEffect, useRef } from 'react';
import sectionTypes from '../config/section-types.json';
import OptimizedImage from './OptimizedImage';
import { getOrgKeyFromFilename } from '../utils/imageUtils';
import { renderMarkdown } from '../utils/markdownUtils';

function UniversalSection({ sectionConfig, data }) {
  const { title, itemType, hasLeftAlignedEntries, showTitle, type } = sectionConfig;
  const itemTypeConfig = sectionTypes.itemTypes[itemType];
  const entryRefs = useRef([]);

  useEffect(() => {
    // Only check height for list sections
    if (type === 'list' && Array.isArray(data)) {
      entryRefs.current.forEach((entryRef) => {
        if (entryRef) {
          const logoElement = entryRef.querySelector('.entry-logo');
          const contentElement = entryRef.querySelector('.entry-content');
          
          if (logoElement && contentElement) {
            const logoHeight = logoElement.offsetHeight;
            const contentHeight = contentElement.offsetHeight;
            const heightDifference = contentHeight - logoHeight;
            const threshold = 40; // If content is only 40px taller than logo, center it
            
            // Remove existing class
            entryRef.classList.remove('small-content');
            
            if (heightDifference <= threshold) {
              // Content is not much taller than logo - center logo with content
              entryRef.classList.add('small-content');
            }
            // Otherwise logo stays at top (when content is significantly taller)
          }
        }
      });
    }
  }, [data, type]);



  if (!data || (Array.isArray(data) && data.length === 0)) {
    return null;
  }

  // Handle single item sections (like About)
  if (type === 'single') {
    if (itemType === 'personal') {
      // Check if we should show the about section
      if (sectionConfig.showOnlyWithDescription && !data.description) {
        return null;
      }
      
      return (
        <section id="about">
          {showTitle && <h2>{title}</h2>}
          <div className="entry">
            <div className="entry-content">
              {data.description && (
                <div className="entry-description">
                  {renderMarkdown(data.description)}
                </div>
              )}
            </div>
          </div>
        </section>
      );
    }
    return null;
  }

  // Handle list sections
  if (!Array.isArray(data)) {
    return null;
  }

  const renderDate = (item) => {
    const { dateFormat } = itemTypeConfig;
    if (!dateFormat) return null;

    if (dateFormat === 'startDate - endDate') {
      return `${item.startDate} - ${item.endDate || 'Present'}`;
    }
    if (dateFormat === 'month year') {
      return `${item.month} ${item.year}`;
    }
    if (dateFormat === 'date') {
      return item.date;
    }
    if (dateFormat === 'year') {
      return item.year;
    }
    return null;
  };

  const renderLogo = (item) => {
    if (item.logo) {
      const orgKey = getOrgKeyFromFilename(item.logo);
      
      if (orgKey) {
        return (
          <OptimizedImage
            type="logo"
            orgKey={orgKey}
            className="entry-logo"
          />
        );
      } else {
        // Fallback for logos not in config
        return (
          <img
            src={`/images/${item.logo}`}
            alt={`${item.company || item.university || 'Organization'} logo`}
            className="entry-logo"
          />
        );
      }
    }
    return null;
  };

  const renderDisplayLine = (line, item) => {
    const fieldValue = item[line.field];
    if (!fieldValue) return null;

    const prefix = line.prefix || '';
    const content = prefix + fieldValue;

    switch (line.type) {
      case 'title':
        return (
          <h3 key={line.field} className="entry-title">
            {content}
          </h3>
        );

      case 'subtitle':
        // Handle special journal name replacement for publications
        let displayContent = content;
        if (line.field === 'journal' && fieldValue === "Int J Sports Physiol Perform") {
          displayContent = prefix + "International Journal of Sports Physiology and Performance";
        }
        
        return (
          <p 
            key={line.field} 
            className="entry-subtitle"
            style={{ fontStyle: line.italic ? 'italic' : 'normal' }}
          >
            {displayContent}
          </p>
        );

      case 'description':
        if (line.markdown) {
          return (
            <div key={line.field} className="entry-description">
              {renderMarkdown(fieldValue)}
            </div>
          );
        } else {
          return (
            <p key={line.field} className="entry-description">
              {content}
            </p>
          );
        }

      case 'link':
        const linkLabel = line.label || 'Link';
        let linkText = fieldValue;
        let linkUrl = fieldValue;

        // Handle custom link text - check for fieldText (like uriText, linkText, etc.)
        const customTextField = line.field + 'Text';
        if (item[customTextField]) {
          linkText = item[customTextField];
        } else if (line.customText && item[line.field + 'Text']) {
          linkText = item[line.field + 'Text'];
        } else if (line.field === 'link' && itemType === 'project') {
          // Default behavior for project links
          linkText = fieldValue.replace(/^https?:\/\//, '');
        }

        // Handle DOI links
        if (line.field === 'doi') {
          linkUrl = `https://doi.org/${fieldValue}`;
        }

        return (
          <p key={line.field} className="entry-description left-aligned-link">
            <strong>{linkLabel}:</strong>{' '}
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
              {linkText}
            </a>
          </p>
        );

      default:
        return null;
    }
  };

  const renderItemContent = (item) => {
    if (!itemTypeConfig.displayLines) return null;

    // Group lines by order, handling sameLine items
    const lineGroups = {};
    itemTypeConfig.displayLines.forEach(line => {
      const order = line.order;
      if (!lineGroups[order]) {
        lineGroups[order] = [];
      }
      lineGroups[order].push(line);
    });

    // Render each group
    const renderedGroups = Object.keys(lineGroups)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map(order => {
        const linesInGroup = lineGroups[order];
        
        // Check if we have sameLine items
        const sameLineItems = linesInGroup.filter(line => line.sameLine);
        const separateItems = linesInGroup.filter(line => !line.sameLine);
        
        const groupElements = [];
        
        // If we have sameLine items, combine them with the base item
        if (sameLineItems.length > 0) {
          const combinedContent = [];
          const baseItem = separateItems[0]; // The main item for this order
          
          if (baseItem && item[baseItem.field]) {
            combinedContent.push((baseItem.prefix || '') + item[baseItem.field]);
          }
          
          sameLineItems.forEach(line => {
            if (item[line.field]) {
              combinedContent.push((line.prefix || '') + item[line.field]);
            }
          });
          
          if (combinedContent.length > 0) {
            const combinedText = combinedContent.join('');
            const isItalic = baseItem?.italic || sameLineItems.some(line => line.italic);
            const isTitle = baseItem?.type === 'title';
            
            if (isTitle) {
              groupElements.push(
                <h3 
                  key={`combined-${order}`} 
                  className="entry-title"
                  style={{ fontStyle: isItalic ? 'italic' : 'normal' }}
                >
                  {combinedText}
                </h3>
              );
            } else {
              groupElements.push(
                <p 
                  key={`combined-${order}`} 
                  className="entry-subtitle"
                  style={{ fontStyle: isItalic ? 'italic' : 'normal' }}
                >
                  {combinedText}
                </p>
              );
            }
          }
          
          // Render remaining separate items (excluding the base item that was combined)
          separateItems.slice(1).forEach(line => {
            const rendered = renderDisplayLine(line, item);
            if (rendered) groupElements.push(rendered);
          });
        } else {
          // No sameLine items, render all separate items
          separateItems.forEach(line => {
            const rendered = renderDisplayLine(line, item);
            if (rendered) groupElements.push(rendered);
          });
        }
        
        return groupElements;
      })
      .flat()
      .filter(Boolean);

    return renderedGroups;
  };

  const sectionId = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <section id={sectionId}>
      {showTitle && <h2>{title}</h2>}
      {data.map((item, index) => (
        <div 
          ref={el => entryRefs.current[index] = el}
          className={`entry ${hasLeftAlignedEntries ? 'left-aligned-entry' : ''}`} 
          key={index}
        >
          {renderLogo(item)}
          <div className="entry-content">
            {renderItemContent(item)}
          </div>
          {renderDate(item) && <span className="entry-date">{renderDate(item)}</span>}
        </div>
      ))}
    </section>
  );
}

export default UniversalSection; 