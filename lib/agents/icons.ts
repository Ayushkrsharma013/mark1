import {
  Target,
  PenTool,
  Handshake,
  Globe,
  FileText,
  Share2,
  Flame,
  Mail,
  ScanEye,
  BarChart3,
  Bot,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Target,
  PenTool,
  Handshake,
  Globe,
  FileText,
  Share2,
  Flame,
  Mail,
  ScanEye,
  BarChart3,
  Bot,
};

export function getAgentIcon(name: string): LucideIcon {
  return ICON_MAP[name] || Bot;
}
