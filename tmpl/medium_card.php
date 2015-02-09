<?php
/**
 * @package     Phproberto.Module
 * @subpackage  Ghcard
 *
 * @copyright   Copyright (C) 2015 Roberto Segura López. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

defined('_JEXEC') or die;

extract($displayData);

/**
 * Layout variables
 * -----------------
 * @var   string           $cssClass        Module CSS class
 * @var   string           $cssId           Module CSS identifier
 * @var   object           $module          Module data as it comes from Joomla
 * @var   phprobertoModule  $moduleInstance  Module rendering this layout
 * @var   JRegistry        $params          Object with the module config
 * @var   stdClass         $profile         Array of items to render
 */

?>
<div class="github-card user-card">
	<div class="header User">
		<a class="github-link" alt="<?php echo JText::_('MOD_PHPROBERTO_GHCARD_LABEL_VIEW_IN_GITHUB'); ?>" href="<?php echo $profile->html_url; ?>">Github</a>
	</div>
	<a href="<?php echo $profile->html_url; ?>" class="avatar"><img alt="<?php echo $profile->name; ?>" src="<?php echo $profile->avatar_url; ?>&amp;s=80"></a>
	<div class="content">
		<h2><?php echo $profile->name; ?> <span><?php echo $profile->login; ?></span></h2>
		<ul class="status">
			<li><a href="<?php echo $profile->html_url; ?>?tab=repositories"><strong><?php echo $profile->public_repos; ?></strong><?php echo JText::_('MOD_PHPROBERTO_GHCARD_LABEL_REPOSITORIES'); ?></a></li>
			<li><a href="<?php echo $profile->html_url; ?>/followers"><strong><?php echo $profile->followers; ?></strong><?php echo JText::_('MOD_PHPROBERTO_GHCARD_LABEL_FOLLOWERS'); ?></a></li>
		</ul>
	</div>
	<div class="footer">
		<?php if ($profile->hireable) : ?>
			<a href="<?php echo $profile->blog; ?>" target="_top"><?php echo JText::_('MOD_PHPROBERTO_GHCARD_LABEL_HIREABLE'); ?></a>
		<?php endif; ?>
	</div>
</div>
